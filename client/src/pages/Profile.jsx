import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile, updateMyProfile } from "../services/api";

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
      </div>
    </section>
  );
}

export default Profile;
