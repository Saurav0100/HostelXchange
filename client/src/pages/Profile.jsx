import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile, updateMyProfile, changePassword } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    studentId: "",
    college: "",
    profileImage: "",
  });

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    college: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

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

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyProfile(token);
        const user = data.user;

        setProfile(user);
        setForm({
          name: user.name || "",
          studentId: user.studentId || "",
          college: user.college || "",
        });
      } catch (err) {
        setError(err.message || "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setError("");
    setMessage("");
  };

  const handleEdit = () => {
    setForm({
      name: profile.name || "",
      studentId: profile.studentId || "",
      college: profile.college || "",
    });
    setEditing(true);
    setError("");
    setMessage("");
  };

  const handleCancel = () => {
    setForm({
      name: profile.name || "",
      studentId: profile.studentId || "",
      college: profile.college || "",
    });
    setEditing(false);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.name.trim() || !form.studentId.trim() || !form.college.trim()) {
      setError("Please complete all profile fields.");
      return;
    }

    try {
      setSaving(true);

      const data = await updateMyProfile(
        {
          name: form.name.trim(),
          studentId: form.studentId.trim(),
          college: form.college.trim(),
        },
        token,
      );

      setProfile(data.user);
      setForm({
        name: data.user.name || "",
        studentId: data.user.studentId || "",
        college: data.user.college || "",
      });

      // Keep the Navbar initials and account information up to date.
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          ...data.user,
        }),
      );

      setEditing(false);
      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

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

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must contain at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError("New password must be different.");
      return;
    }

    try {
      setPasswordLoading(true);

      const data = await changePassword(
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        token,
      );

      setPasswordMessage(data.message);

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswords({
        current: false,
        new: false,
        confirm: false,
      });

      // Log out after password change.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/HostelXchange/login";
      }, 2000);
    } catch (err) {
      setPasswordError(err.message || "Unable to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container section profile-page">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error && !profile.name) {
    return (
      <div className="container section profile-page">
        <div className="profile-alert profile-error">{error}</div>
        <Link to="/login" className="profile-back-link">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <section className="container section profile-page">
      <div className="profile-heading">
        <div>
          <p className="profile-eyebrow">YOUR ACCOUNT</p>
          <h1>My Profile</h1>
          <p>Manage your personal and student information.</p>
        </div>

        <Link to="/" className="profile-back-link">
          ← Back to Home
        </Link>
      </div>

      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-avatar-large">{initials || "U"}</div>

          <div className="profile-identity">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <span className="profile-account-label">Student Account</span>
          </div>

          {!editing && (
            <button
              type="button"
              className="profile-edit-btn"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-divider" />

        <div className="profile-details">
          <h3>Personal Information</h3>

          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-field">
                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">Email Address</label>
                <input
                  id="profile-email"
                  value={profile.email}
                  readOnly
                  disabled
                />
                <small>Email address cannot be changed here.</small>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-studentId">Student ID</label>
                <input
                  id="profile-studentId"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-college">College Name</label>
                <input
                  id="profile-college"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <p className="profile-alert profile-error" role="alert">
                  {error}
                </p>
              )}

              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span>Full Name</span>
                <strong>{profile.name || "Not provided"}</strong>
              </div>

              <div className="profile-info-item">
                <span>Email Address</span>
                <strong>{profile.email || "Not provided"}</strong>
              </div>

              <div className="profile-info-item">
                <span>Student ID</span>
                <strong>{profile.studentId || "Not provided"}</strong>
              </div>

              <div className="profile-info-item">
                <span>College Name</span>
                <strong>{profile.college || "Not provided"}</strong>
              </div>
            </div>
          )}

          {message && (
            <p className="profile-alert profile-success" role="status">
              {message}
            </p>
          )}
        </div>

        <div className="profile-divider" />

        <div className="profile-details">
          <h3>Security & Password</h3>

          <p className="password-section-description">
            Keep your account secure by updating your password regularly.
          </p>

          <form className="profile-form" onSubmit={handlePasswordSubmit}>
            {[
              {
                name: "currentPassword",
                label: "Current Password",
                key: "current",
              },
              {
                name: "newPassword",
                label: "New Password",
                key: "new",
              },
              {
                name: "confirmPassword",
                label: "Confirm New Password",
                key: "confirm",
              },
            ].map((field) => (
              <div className="profile-field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>

                <div className="password-input-wrapper">
                  <input
                    id={field.name}
                    name={field.name}
                    type={showPasswords[field.key] ? "text" : "password"}
                    value={passwordForm[field.name]}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility(field.key)}
                    aria-label={
                      showPasswords[field.key]
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPasswords[field.key] ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            ))}

            <p className="password-hint">
              Your new password must contain at least 8 characters.
            </p>

            {passwordError && (
              <p className="profile-alert profile-error" role="alert">
                {passwordError}
              </p>
            )}

            {passwordMessage && (
              <p className="profile-alert profile-success" role="status">
                {passwordMessage}
              </p>
            )}

            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-save-btn"
                disabled={passwordLoading}
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
