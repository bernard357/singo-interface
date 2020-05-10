// main customization file

// example of usage:
//
//  import { c11n } from '@/customization';
//
//  methods: {
//
//    withinSomeCode(...) {
//      ...
//      value = c11n.someAttribute
//      ...
//    }
//
//  }
//

export const c11n = {

  // run-time configuration
  serviceUrl: 'http://127.0.0.1:5000/',

  // locale settings
  locale: "fr",

  // feature toggling
  withCamera: false,

  // strings for HTTP error messages
  code403Message: "Vous n'avez pas la permission d'accèder à cette information.",
  code409Message: "La page a été modifiée par ailleurs. La nouvelle version va être rechargée.",

  // strings for non-HTTP error messages
  code950Message: "Impossible d'accéder à une caméra.",

  // personas
  registeredPersona: "Enregistré",
  memberPersona: "Membre",
  leaderPersona: "Membre du bureau",
  supportPersona: "Ingénieur système",
  robotPersona: "Agent logiciel",
  auditPersona: "Auditeur",

  labelPersona(val) {
    let labels = {}
    labels.registered = c11n.registeredPersona
    labels.member = c11n.memberPersona
    labels.leader = c11n.leaderPersona
    labels.support = c11n.supportPersona
    labels.robot = c11n.robotPersona
    labels.audit = c11n.auditPersona
    return labels[val] || val
  },


  // titles of views
  authenticatePageTitle: "Qui êtes-vous ?",
  boardChannelPageTitle: "Réservé au bureau de l'association",
  communityChannelPageTitle: "Réservé aux membres de l'association",
  homeChannelPageTitle: "Chorale de Ville d'Avray",
  identitiesPageTitle: "Liste des membres",
  informationPageTitle: "Information",
  pageDefaultPageTitle: "Une page",
  profileDefaultPageTitle: "Un profil",
  registerPageTitle: "Enregistrement utilisateur",

  // the Authenticate view
  welcomeAndAuthenticatePageTitle: "Bienvenue - veuillez entrer votre mot de passe",
  loginButton: "Vérifier",
  logoutButton: "Terminer la session",
  authenticationConfirmationMessage: "Votre identité",
  authenticationFailureMessage: "Erreur de mot de passe",

  // the Identities view
  firstNameHeader: "Prénom",
  lastNameHeader: "Nom",
  phoneNumberHeader: "Téléphone",
  eMailHeader: "Courriel",
  keywordsHeader: "Mots-clés",
  personaHeader: "Statut",
  detailsHeader: "Détails",
  searchLabel: "Filtrer",
  zoomLinkLabel: "détail",

  // the Information view
  informationPagePlaceholder: "Entrez ici les informations sur ce site, et les réponses aux questions des internautes",

  // the Page view
  contentPlaceholder: "Entrez le texte principal ici",
  introductionPlaceholder: "Entrez l'introduction ici",
  pageInformationForCoreMember: "Sélectionnez un élement de la page pour le modifier",
  plannedLabel: "Cochez pour faire apparaitre dans le calendrier à la date suivante",
  publishLabel: "Cochez lorsque la page est prête pour publication",
  titlePlaceholder: "Titre de page",
  channelIcon: "mdi-music-circle",
  modificationString: "Page modifiée le %DATE% à %TIME% par %EDITOR%",

  // the Profile view
  changePasswordLabel: "Changer le mot de passe",
  newPasswordLabel: "Entrez un nouveau mot de passe",

  // the Register view
  welcomeAndRegisterPageTitle: "Indiquez aussi vos prénom et nom",
  registerButton: "Enregistrer",
  secretLabel: "Secret",

  // used in Components/HtmlEditor
  htmlEditorPlaceholder: "Entrez votre texte ici",

  // used in components/ConfirmDialog
  confirmDeletionTitle: "Suppression",
  areYouSureQuestion: "Cette opération est irréversible. La confirmez-vous ?",
  yesButton: "Oui",
  cancelButton: "Annuler",
  confirmPageDeletionTitle: "Suppression de la page",
  confirmPageDeletionText: "Cette opération est irréversible. La confirmez-vous ?",
  confirmProfileDeletionTitle: "Suppression du profil",
  confirmProfileDeletionText: "Cette opération est irréversible. La confirmez-vous ?",

  // used in components/PageCard
  exploreButton: "Lire",

  // strings by alphabetical order

  barTitle: "Chorale de Ville d'Avray",
  closeAlertLabel: "Fermer",
  draftLabel: "Brouillon",
  emailIsInvalidLabel: "Adresse e-mail invalide",
  emailIsRequiredLabel: "Merci d'indiquer une adresse e-mail",
  emailLabel: "Adresse e-mail",
  emailPlaceholder: "Indiquez une adresse valide",
  firstNameIsRequiredLabel: "Merci d'indiquer un prénom",
  firstNameLabel: "Prénom(s)",
  footerText: "2020, Association de la Chorale de Ville d'Avray",
  goToAuthenticateIcon: "mdi-face",  // mdi-account-circle",
  goToAuthenticateLabel: "Entrez votre mot de passe",
  goToBoardIcon: "mdi-music-circle",
  goToBoardLabel: "Espace pour le bureau",
  goToCommunityIcon: "mdi-music-circle",
  goToCommunityLabel: "Espace pour les membres",
  goToHomeIcon: "mdi-music-circle",
  goToHomeLabel: "Page d'accueil",
  goToIdentitiesIcon: "mdi-account-group",
  goToIdentitiesLabel: "Liste des membres",
  goToInformationIcon: "mdi-help-circle",
  goToInformationLabel: "En savoir plus",
  goToRegisterIcon: "mdi-account-music",
  goToRegisterLabel: "Enregistrez-vous",
  lastNameIsRequiredLabel: "Merci d'indiquer un nom de famille",
  lastNameLabel: "Nom",
  passwordIsInvalidLabel: "Le mot de passe devrait avoir au moins 8 caractères",
  passwordIsRequiredLabel: "Merci d'indiquer un mot de passe",
  passwordLabel: "Mot de passe",
  passwordPlaceholder: "Au moins 8 caractères",
  submitButton: "Enregistrer",

  barTitleLight: "Ville d'Avray",
  cancelLocale: "Annuler",
  cockpitTitle: "Panneau de gestion",
  colon: ": ",
  coreAudienceLabel: "Le bureau",
  coreLabel: "Vous êtes membre du bureau",
  coreName: "Bureau",
  coreTitle: "Le coin du bureau de l'association",
  createPageButton: "Ajouter une page",
  defaultTitle: "Chorale de Ville d'Avray",
  exportPagesButton: "Exporter les pages",
  forbiddenContent: "Vous n'avez pas accès à ce contenu",
  forbiddenTitle: "Vous n'avez pas accès à cette page",
  goToCockpitButton: "Panneau de gestion",
  goToCoreButton: "Le coin du bureau",
  goToGroupButton: "Le coin des membres",
  groupAudienceLabel: "Les membres",
  groupLabel: "Vous êtes membre de l'association",
  groupName: "Membre",
  groupTitle: "Le coin des membres de l'association",
  importExportTitle: "Importer et exporter des pages",
  importPagesButton: "Importer des pages",
  invalidCredentialsMessage: "Votre identité n'est pas vérifiée, veuillez essayer à nouveau",
  nameErrorMessage: "Le nom doit avoir une longueur suffisante",
  nameLabel: "Votre nom",
  namePlaceholder: "Indiquez votre nom",
  okLocale: "OK",
  passwordErrorMessage: "Le mot de passe n'est pas valide",
  statusLabel: "Votre statut",
  universeAudienceLabel: "Accès public",

  // colors by alphabetical order

  primaryColor: "orange white--text",
  secondaryColor: "blue-gray brown-text",

  // configuration parameters by alphabetical order

  assetsForImport: "assets/content.yaml",  // in src/ if relative path
};
