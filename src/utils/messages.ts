export const messages = {
  en: {
    user: {
      // Validation
      firstNameRequired: "First name is required",
      firstNameMin: "First name must be at least 2 characters",
      lastNameRequired: "Last name is required",
      lastNameMin: "Last name must be at least 2 characters",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format",
      passwordMin: "Password must be at least 8 characters",
      passwordUpper: "Must contain at least one uppercase letter",
      passwordLower: "Must contain at least one lowercase letter",
      passwordNumber: "Must contain at least one number",
      userNotFound: "User not found",
      emailInUse: "Email already in use",
      updateSuccess: "User updated successfully",

      // Register
      emailAlreadyExists: "E-mail already registered",
      registrationSuccess: "Registration successful",
      userCreated: "User created successfully",

      // Pagination
      invalidPage: "Page must be greater than or equal to 1",
      invalidLimit: "Limit must be between 1 and 100",
      invalidSort: "Invalid sort field",
      invalidOrder: "Order must be 'asc' or 'desc'",
    },

    auth: {
      invalidCredentials: "Invalid email or password",
      loginSuccess: "Login successful",
      tokenMissing: "No token provided",
      invalidToken: "Invalid token",
      unauthorized: "Unauthorized access",
      logoutSuccess: "Logged out successfully",
    },

    general: {
      validationFailed: "Validation failed",
      serverError: "Internal server error",
      notFound: "Resource not found",
    },
    protect: {
      notLoggedIn: "You are not logged in",
      userDeleted: "User no longer exists",
      invalidToken: "Invalid token",
    },
  },

  ar: {
    user: {
      // Validation
      firstNameRequired: "الاسم الأول مطلوب",
      firstNameMin: "يجب أن يكون الاسم الأول على الأقل حرفين",
      lastNameRequired: "اسم العائلة مطلوب",
      lastNameMin: "يجب أن يكون اسم العائلة على الأقل حرفين",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "صيغة البريد الإلكتروني غير صحيحة",
      passwordMin: "يجب أن تكون كلمة المرور على الأقل 8 أحرف",
      passwordUpper: "يجب أن تحتوي على حرف كبير واحد على الأقل",
      passwordLower: "يجب أن تحتوي على حرف صغير واحد على الأقل",
      passwordNumber: "يجب أن تحتوي على رقم واحد على الأقل",
      userNotFound: "المستخدم غير موجود",
      emailInUse: "البريد الإلكتروني مستخدم بالفعل",
      updateSuccess: "تم تحديث المستخدم بنجاح",

      // Register
      emailAlreadyExists: "البريد الإلكتروني مسجل مسبقًا",
      registrationSuccess: "تم التسجيل بنجاح",
      userCreated: "تم إنشاء المستخدم بنجاح",

      // Pagination
      invalidPage: "رقم الصفحة يجب أن يكون أكبر أو يساوي 1",
      invalidLimit: "عدد العناصر يجب أن يكون بين 1 و 100",
      invalidSort: "حقل الترتيب غير صالح",
      invalidOrder: "قيمة الترتيب يجب أن تكون asc أو desc",
    },

    auth: {
      invalidCredentials: "البريد أو كلمة المرور غير صحيحة",
      loginSuccess: "تم تسجيل الدخول بنجاح",
      tokenMissing: "لم يتم إرسال التوكن",
      invalidToken: "توكن غير صالح",
      unauthorized: "غير مصرح لك بالوصول",
      logoutSuccess: "تم تسجيل الخروج بنجاح", // 👈
    },

    general: {
      validationFailed: "فشل التحقق من البيانات",
      serverError: "خطأ داخلي في الخادم",
      notFound: "العنصر غير موجود",
    },
    protect: {
      notLoggedIn: "لم تقم بتسجيل الدخول",
      userDeleted: "المستخدم لم يعد موجودًا",
      invalidToken: "توكن غير صالح",
    },
  },

  de: {
    user: {
      // Validation
      firstNameRequired: "Vorname ist erforderlich",
      firstNameMin: "Der Vorname muss mindestens 2 Zeichen haben",
      lastNameRequired: "Nachname ist erforderlich",
      lastNameMin: "Der Nachname muss mindestens 2 Zeichen haben",
      emailRequired: "E-Mail ist erforderlich",
      emailInvalid: "Ungültiges E-Mail-Format",
      passwordMin: "Das Passwort muss mindestens 8 Zeichen haben",
      passwordUpper: "Muss mindestens einen Großbuchstaben enthalten",
      passwordLower: "Muss mindestens einen Kleinbuchstaben enthalten",
      passwordNumber: "Muss mindestens eine Zahl enthalten",
      userNotFound: "Benutzer nicht gefunden",
      emailInUse: "E-Mail wird bereits verwendet",
      updateSuccess: "Benutzer erfolgreich aktualisiert",

      // Register
      emailAlreadyExists: "E-Mail ist bereits registriert",
      registrationSuccess: "Registrierung erfolgreich",
      userCreated: "Benutzer erfolgreich erstellt",

      // Pagination
      invalidPage: "Die Seite muss größer oder gleich 1 sein",
      invalidLimit: "Das Limit muss zwischen 1 und 100 liegen",
      invalidSort: "Ungültiges Sortierfeld",
      invalidOrder: "Die Sortierreihenfolge muss 'asc' oder 'desc' sein",
    },

    auth: {
      invalidCredentials: "Ungültige E-Mail oder Passwort",
      loginSuccess: "Erfolgreich eingeloggt",
      tokenMissing: "Kein Token bereitgestellt",
      invalidToken: "Ungültiges Token",
      unauthorized: "Nicht autorisiert",
      logoutSuccess: "Erfolgreich ausgeloggt",
    },
    protect: {
      notLoggedIn: "Sie sind nicht eingeloggt",
      userDeleted: "Benutzer existiert nicht mehr",
      invalidToken: "Ungültiges Token",
    },

    general: {
      validationFailed: "Validierung fehlgeschlagen",
      serverError: "Interner Serverfehler",
      notFound: "Ressource nicht gefunden",
    },
  },
} as const;

export type Lang = keyof typeof messages;
