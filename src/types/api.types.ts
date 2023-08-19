interface LinkInfo {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

interface Publisher {
  username: string;
  email: string;
}

interface Maintainer {
  username: string;
  email: string;
}

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: LinkInfo;
  publisher: Publisher;
  maintainers: Maintainer[];
}

interface ScoreDetail {
  quality: number;
  popularity: number;
  maintenance: number;
}

interface ScoreInfo {
  final: number;
  detail: ScoreDetail;
}

interface ObjectInfo {
  package: PackageInfo;
  score: ScoreInfo;
  searchScore: number;
}

export interface SearchAPIResponse {
  objects: ObjectInfo[];
  total: number;
  time: string;
}
