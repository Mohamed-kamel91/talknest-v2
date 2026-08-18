type Environment = 'development' | 'production' | 'staging' | 'ci';

type Script =
  'start' | 'start:dev' | 'test:unit' | 'test:infra' | 'test:e2e';

export class Config {
  private readonly env: Environment;
  private readonly script: Script;
  private readonly apiURL: string;

  constructor(script: Script) {
    this.env = (process.env.NODE_ENV as Environment) || 'development';
    this.script = script;
    this.apiURL = this.getApiURL();
  }

  public getEnvironment() {
    return this.env;
  }

  public getScript() {
    return this.script;
  }

  public getApiURL() {
    const fallback = 'http://localhost:3000';

    // In staging, API_URL_STAGING is used
    // if (this.env === 'staging') {
    //   return process.env.API_URL_STAGING || fallback;
    // }

    return fallback;
  }
}
