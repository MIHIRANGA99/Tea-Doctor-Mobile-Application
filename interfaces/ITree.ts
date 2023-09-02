export default interface ITree {
  id?: string;
  treeName: string;
  treeAge: number;
  location: { lat: number; long: number };
  conditions: {
    leaves: object,
    stemAndBranches: object,
    bugs: object,
  };
}
