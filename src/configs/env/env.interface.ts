import { AppConfig } from '../app.config';
import { NecordConfig } from '../necord.config';
import { TypeOrmConfig } from '../typeorm.config';

/**
 * Configuration interface.
 */
export interface Config extends AppConfig, NecordConfig, TypeOrmConfig {}
