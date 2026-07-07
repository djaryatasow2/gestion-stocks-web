// Auto-generated DTO interfaces from API schema

export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  nom?: string;
  prenom?: string;
  role?: string;
  active?: boolean;
  entrepriseId?: number;
}

export interface StockDto {
  id?: number;
  quantite?: number;
  quantiteMinimale?: number;
  quantiteMaximale?: number;
  emplacement?: string;
  lastUpdated?: string;
  articleId?: number;
  entrepotId?: number;
}

export interface SeuilAlerteDto {
  id?: number;
  seuilMinimum?: number;
  seuilMaximum?: number;
  articleId?: number;
  entrepotId?: number;
}

export interface PrevisionDto {
  id?: number;
  periodeDebut?: string; // date
  periodeFin?: string; // date
  quantitePrevue?: number;
  methodePrevision?: string;
  niveauConfiance?: number;
  articleId?: number;
  entrepotId?: number;
}

export interface InventaireDto {
  id?: number;
  nom?: string;
  dateDebut?: string;
  dateFin?: string;
  statut?: string;
  entrepriseId?: number;
}

export interface EntrepriseDto {
  id?: number;
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  siret?: string;
  dateCreation?: string;
}

export interface EntrepotDto {
  id?: number;
  nom?: string;
  adresse?: string;
  code?: string;
  capaciteMax?: number;
  actif?: boolean;
  entrepriseId?: number;
}

export interface CategorieDto {
  id?: number;
  nom?: string;
  description?: string;
  categorieParentId?: number;
}

export interface ArticleDto {
  id?: number;
  code?: string;
  nom?: string;
  description?: string;
  uniteMesure?: string;
  poids?: number;
  volume?: number;
  codeBarre?: string;
  qrCode?: string;
  categorieId?: number;
  entrepriseId?: number;
}

export interface MouvementStockDto {
  id?: number;
  typeMouvement?: string;
  quantite?: number;
  reference?: string;
  dateMouvement?: string;
  motif?: string;
  coutUnitaire?: number;
  prixVente?: number;
  stockId?: number;
  userId?: number;
}

export interface InventaireSessionDto {
  entrepriseId?: number;
  entrepotId?: number;
  lignes?: LigneInventaireDto[];
}

export interface LigneInventaireDto {
  id?: number;
  quantitePhysique?: number;
  quantiteSysteme?: number;
  ecart?: number;
  remarques?: string;
  scanDate?: string;
  inventaireId?: number;
  articleId?: number;
}

export interface RefreshTokenRequestDto { refreshToken: string; }

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  username?: string;
  role?: string;
}

export interface AuthRequestDto { username: string; password: string; email?: string; }

export interface AlerteDto {
  id?: number;
  typeAlerte?: string;
  message?: string;
  estTraite?: boolean;
  dateCreation?: string;
  dateTraitement?: string;
  stockId?: number;
}

export interface NotificationDto {
  id?: number;
  type?: string;
  message?: string;
  estLue?: boolean;
  dateEnvoi?: string;
  alerteId?: number;
  userId?: number;
}

export interface DashboardDto {
  totalArticles?: number;
  totalEntrepots?: number;
  totalStocksCritiques?: number;
  totalAlertesNonTraitees?: number;
  totalMouvementsAujourdhui?: number;
  valeurTotaleStock?: number;
}

export default {};
