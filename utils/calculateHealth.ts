import ITree from "../interfaces/ITree";

export const calculateConditions = (id: string, trees: ITree[]): number => {
  let totalDamage = 0;
  const conditions = trees.find((tree) => tree.id === id)?.conditions;

  if (conditions) {
    Object.keys(conditions).forEach((cond: string) => {
      if (Object.keys(conditions[cond]).length != 0) {
        totalDamage =
          totalDamage + Number(conditions[cond].damageRatio.split("%")[0]);
      }
    });

    totalDamage = totalDamage / Object.keys(conditions).length;
  }

  return Number((100 - totalDamage).toFixed(1));
};
