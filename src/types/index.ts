export type Geography = {
  type: string;
  properties: {
    name: string;
    uf: string;
    codigo: number;
    regiao: string;
  };
  id: string;
  rsmKey: string;
};

export type MetaItem = {
  [key: string]: string | number;
};

export type Metadata = {
  [key: string]: MetaItem;
};

