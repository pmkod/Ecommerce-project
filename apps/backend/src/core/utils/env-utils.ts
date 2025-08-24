const getEnvVal = (envVarName: string) => {
  const envVal = process.env[envVarName];

  if (envVal === "" || envVal === undefined || envVal === null) {
    throw Error("Empty env var");
  }

  return envVal;
};

export { getEnvVal };
