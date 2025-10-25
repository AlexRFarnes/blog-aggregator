import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const content = fs.readFileSync(filePath, "utf-8");
  const rawConfig = JSON.parse(content);
  return validateConfig(rawConfig);
}

export function getCurrentUser(): string {
  const config = readConfig();
  return config.currentUserName;
}

function getConfigFilePath(): string {
  const configFileName = ".gatorconfig.json";
  return path.join(os.homedir(), configFileName);
}

function writeConfig(cfg: Config) {
  const filePath = getConfigFilePath();

  const rawConfig = {
    current_user_name: cfg.currentUserName,
    db_url: cfg.dbUrl,
  };

  fs.writeFileSync(filePath, JSON.stringify(rawConfig, null, 2), {
    encoding: "utf-8",
  });
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in the config file");
  }

  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in the config file");
  }

  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
  return config;
}
