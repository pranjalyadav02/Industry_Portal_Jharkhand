export class PublicProjectionService {
  /**
   * Sanitizes challenge data for public consumption
   */
  static projectChallenge(challenge: any) {
    if (!challenge) return null;
    
    // Explicitly remove private data
    const { 
      reporterPhone, 
      reporterEmail, 
      exactLat, 
      exactLng, 
      internalNotes, 
      ...publicData 
    } = challenge;
    
    return publicData;
  }

  /**
   * Sanitizes project data
   */
  static projectProject(project: any) {
    if (!project) return null;
    
    const {
      confidentialResearch,
      ipDetails,
      financialSecrets,
      ...publicData
    } = project;

    return publicData;
  }

  static projectAccountability(accountability: any) {
    if (!accountability) return null;

    const {
      reporterIdentity,
      protectedEvidence,
      confidentialInvestigationNotes,
      sensitiveWitnessInfo,
      ...publicData
    } = accountability;

    return publicData;
  }
}
