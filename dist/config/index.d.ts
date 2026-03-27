import { TidewaysConfig } from '../types/index.js';
export interface ServerConfig extends TidewaysConfig {
    port?: number;
}
export declare function loadConfig(): ServerConfig;
export declare function validateCredentials(config: ServerConfig): void;
//# sourceMappingURL=index.d.ts.map