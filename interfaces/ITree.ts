export default interface ITree {
  id?: string;
  treeName: string;
  treeAge: number;
  location: { lat: number; long: number };
  conditions: {
    leaves: any,
    stemAndBranches: any,
    bugs: any,
  };
}
