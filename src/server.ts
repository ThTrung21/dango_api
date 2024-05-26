import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();
//[nodemon] app crashed - waiting for file changes before starting...
const app = new App([new AuthRoute()]);

app.listen();
