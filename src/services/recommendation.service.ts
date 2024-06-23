import { User } from '@interfaces/users.interface';
import { Dish } from '@/interfaces/dishes.interface';
import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@/database';

@Service()
export class RecommendationService {
  private db = DB;

  async getRecommendations(userId: number): Promise<Dish[]> {
    // Fetch the user and liked dishes
    const user = await this.db.User.findByPk(userId);
    if (!user || !user.likeddish) {
      return [];
    }

    // Fetch all dishes
    const allDishes = await this.db.Dish.findAll();
    const likedDishIds = user.likeddish;

    // Get liked dishes details
    const likedDishes = allDishes.filter((dish: Dish) => likedDishIds.includes(dish.id.toString()));

    // Create a category preference map
    const categoryPreference: { [key: string]: number } = {};
    likedDishes.forEach((dish: Dish) => {
      if (categoryPreference[dish.category]) {
        categoryPreference[dish.category] += dish.score;
      } else {
        categoryPreference[dish.category] = dish.score;
      }
    });

    // Normalize category preferences
    const totalScore = Object.values(categoryPreference).reduce((a, b) => a + b, 0);
    for (const category in categoryPreference) {
      categoryPreference[category] /= totalScore;
    }

    // Calculate similarity for all dishes based on category preference
    const recommendations = allDishes.map((dish: Dish) => {
      const similarity = categoryPreference[dish.category] || 0;
      return { dish, similarity };
    });

    // Sort recommendations by similarity and dish score
    recommendations.sort((a, b) => b.similarity - a.similarity || b.dish.score - a.dish.score);

    // Return top recommendations
    return recommendations.slice(0, 5).map(rec => rec.dish);
  }
}
