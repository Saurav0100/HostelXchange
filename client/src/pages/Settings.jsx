import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { changePassword, getMyProfile } from "../services/api";

const defaultNotifications = {
  transactionUpdates: true,
  marketplaceUpdates: true,
};

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("hostelXchangeNotifications") || "null",
      );

      return { ...defaultNotifications, ...(saved || {}) };
    } catch {
      return defaultNotifications;
    }
  });

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!token) {
        setLoadingProfile(false);
        return;
      }

      try {
        const data = await getMyProfile(token);

        if (active) {
          setProfile(data.user);
        }
      } catch (error) {
        if (active) {
          setPasswordError(
            error.message || "Unable to load account information.",
          );
        }
      } finally {
        if (active) {
          setLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [token]);

  const handlePasswordChange = (event) => {
    setPasswordForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setPasswordError("");
    setPasswordMessage("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError("Please complete all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must contain at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError("Your new password must be different.");
      return;
    }

    try {
      setSavingPassword(true);

      const data = await changePassword(
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        token,
      );

      setPasswordMessage(
        data.message || "Password changed successfully. Please log in again.",
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // The backend does not revoke existing JWTs.
      // Clear this browser's session after a successful password change.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
        state: {
          message: "Your password was changed. Please log in again.",
        },
      });
    } catch (error) {
      setPasswordError(error.message || "Unable to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleNotificationChange = (event) => {
    const updated = {
      ...notifications,
      [event.target.name]: event.target.checked,
    };

    setNotifications(updated);

    localStorage.setItem("hostelXchangeNotifications", JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (!token) {
    return (
      <section className="container section settings-page">
        <div className="settings-message">
          <h2>Please log in</h2>
          <p>You need to log in to access your account settings.</p>
          <Link to="/login" className="settings-primary-btn">
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section settings-page">
      <div className="settings-heading">
        <div>
          <p className="settings-eyebrow">YOUR ACCOUNT</p>
          <h1>Settings</h1>
          <p>Manage your password, notifications and account information.</p>
        </div>

        <Link to="/profile" className="settings-back-link">
          ← My Profile
        </Link>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          {/* CHANGE PASSWORD */}
          <section className="settings-card">
            <div className="settings-section-heading">
              <div className="settings-icon">🔒</div>
              <div>
                <h2>Change Password</h2>
                <p>Keep your HostelXChange account secure.</p>
              </div>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="settings-password-form"
            >
              {[
                {
                  name: "currentPassword",
                  label: "Current Password",
                  field: "current",
                },
                {
                  name: "newPassword",
                  label: "New Password",
                  field: "new",
                },
                {
                  name: "confirmPassword",
                  label: "Confirm New Password",
                  field: "confirm",
                },
              ].map((item) => (
                <div className="settings-field" key={item.name}>
                  <label htmlFor={item.name}>{item.label}</label>

                  <div className="settings-password-wrapper">
                    <input
                      id={item.name}
                      name={item.name}
                      type={showPasswords[item.field] ? "text" : "password"}
                      value={passwordForm[item.name]}
                      onChange={handlePasswordChange}
                      autoComplete={
                        item.field === "current"
                          ? "current-password"
                          : "new-password"
                      }
                      required
                    />

                    <button
                      type="button"
                      className="settings-password-toggle"
                      onClick={() => togglePasswordVisibility(item.field)}
                      aria-label={
                        showPasswords[item.field]
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPasswords[item.field] ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
              ))}

              <p className="settings-password-hint">
                Your new password must contain at least 8 characters.
              </p>

              {passwordError && (
                <p className="settings-alert settings-error" role="alert">
                  {passwordError}
                </p>
              )}

              {passwordMessage && (
                <p className="settings-alert settings-success" role="status">
                  {passwordMessage}
                </p>
              )}

              <button
                type="submit"
                className="settings-primary-btn"
                disabled={savingPassword}
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </section>

          {/* NOTIFICATION PREFERENCES */}
          <section className="settings-card">
            <div className="settings-section-heading">
              <div className="settings-icon">🔔</div>
              <div>
                <h2>Notification Preferences</h2>
                <p>Choose which updates you want to keep enabled.</p>
              </div>
            </div>

            <div className="settings-preference">
              <div>
                <strong>Transaction Updates</strong>
                <p>Requests, acceptance, rejection and completion updates.</p>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  name="transactionUpdates"
                  checked={notifications.transactionUpdates}
                  onChange={handleNotificationChange}
                />
                <span className="settings-switch-slider" />
              </label>
            </div>

            <div className="settings-preference">
              <div>
                <strong>Marketplace Updates</strong>
                <p>Updates about marketplace activity and listings.</p>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  name="marketplaceUpdates"
                  checked={notifications.marketplaceUpdates}
                  onChange={handleNotificationChange}
                />
                <span className="settings-switch-slider" />
              </label>
            </div>

            <p className="settings-preference-note">
              Preferences are currently saved in this browser. They do not yet
              control email or push notifications.
            </p>
          </section>
        </div>

        {/* ACCOUNT INFORMATION */}
        <aside className="settings-card settings-account-card">
          <div className="settings-section-heading">
            <div className="settings-icon">👤</div>
            <div>
              <h2>Account Information</h2>
              <p>Your registered student details.</p>
            </div>
          </div>

          {loadingProfile ? (
            <p className="settings-muted">Loading account information...</p>
          ) : profile ? (
            <div className="settings-account-details">
              <div>
                <span>Full Name</span>
                <strong>{profile.name || "Not provided"}</strong>
              </div>

              <div>
                <span>Email Address</span>
                <strong>{profile.email || "Not provided"}</strong>
              </div>

              <div>
                <span>Student ID</span>
                <strong>{profile.studentId || "Not provided"}</strong>
              </div>

              <div>
                <span>College</span>
                <strong>{profile.college || "Not provided"}</strong>
              </div>

              <Link to="/profile" className="settings-secondary-link">
                Edit Profile →
              </Link>
            </div>
          ) : (
            <p className="settings-muted">
              Account information could not be loaded.
            </p>
          )}
        </aside>
      </div>

      {/* LOGOUT */}
      <section className="settings-card settings-logout-card">
        <div>
          <h2>Log Out</h2>
          <p>Sign out of your HostelXChange account on this browser.</p>
        </div>

        <button
          type="button"
          className="settings-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </section>
  );
}

export default Settings;
