/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: airecommendations
 * Interface for AIRecommendations
 */
export interface AIRecommendations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  recommendationText?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  relatedMetrics?: string;
  /** @wixFieldType datetime */
  generatedAt?: Date | string;
  /** @wixFieldType text */
  priority?: string;
}


/**
 * Collection ID: detectionhistory
 * Interface for DetectionHistory
 */
export interface DetectionHistory {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType datetime */
  eventTimestamp?: Date | string;
  /** @wixFieldType text */
  detectedObject?: string;
  /** @wixFieldType number */
  confidenceScore?: number;
  /** @wixFieldType text */
  detectionLocation?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  snapshot?: string;
  /** @wixFieldType url */
  footageLink?: string;
}


/**
 * Collection ID: loginhistory
 * Interface for LoginHistory
 */
export interface LoginHistory {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  operatorId?: string;
  /** @wixFieldType datetime */
  loginTimestamp?: Date | string;
  /** @wixFieldType datetime */
  logoutTimestamp?: Date | string;
  /** @wixFieldType number */
  sessionDuration?: number;
  /** @wixFieldType text */
  accessLevel?: string;
}


/**
 * Collection ID: systemerrorlogs
 * Interface for SystemErrorLogs
 */
export interface SystemErrorLogs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  errorMessage?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
  /** @wixFieldType text */
  severity?: string;
  /** @wixFieldType text */
  affectedComponent?: string;
  /** @wixFieldType text */
  errorCode?: string;
  /** @wixFieldType boolean */
  isResolved?: boolean;
}


/**
 * Collection ID: trackeddatalogs
 * Interface for TrackedDataLogs
 */
export interface TrackedDataLogs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  coordinateX?: number;
  /** @wixFieldType number */
  coordinateY?: number;
  /** @wixFieldType number */
  coordinateZ?: number;
  /** @wixFieldType number */
  confidenceScore?: number;
  /** @wixFieldType number */
  trackingDuration?: number;
  /** @wixFieldType text */
  objectClassification?: string;
}
