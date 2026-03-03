import {config} from 'dotenv';
import {resolve} from 'path';

// load local environment variables explicitly
config({ path: resolve(__dirname, '.env.local') });
