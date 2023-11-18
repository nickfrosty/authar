/**
 * Master global types for the website/app
 */

type Option<T> = T | null;

type SimpleComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * Define simple type definitions of the env variables
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * General variables and settings
     */
    TURSO_URL: string;
    TURSO_AUTH_TOKEN: string;
  }
}
