import React from 'react';
import './TermsOfService.css';

export default function TermsOfService () {
  return (
    <div className="tos-container">
      <h1>Terms of Service</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By installing or using this Chrome Extension ("Extension"), you agree to these Terms of Service ("Terms"). If you do not agree with these Terms, you may not use the Extension.
        </p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>
          The Extension allows users to mute or reduce background music in YouTube videos while preserving dialogue and other sounds. It performs real-time audio processing within the user's browser and offers usage-based plans, including Trial, Basic, and Pro tiers.
        </p>
      </section>

      <section>
        <h2>3. User Accounts</h2>
        <p>
          To access certain features, you must create an account using a valid email address. You are responsible for maintaining the confidentiality of your account and for all activity under your account.
        </p>
      </section>

      <section>
        <h2>4. Usage Plans and Access Control</h2>
        <p>
          Access to features may be restricted based on your selected plan. Usage limits (such as processing time or session count) may apply and are enforced through tracking of your extension usage.
        </p>
        <p>
          We reserve the right to modify, suspend, or terminate access for accounts that violate plan limits or attempt to bypass access controls.
        </p>
      </section>

      <section>
        <h2>5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Reverse-engineer, decompile, or attempt to extract the source code of the Extension</li>
          <li>Use the Extension to violate applicable laws or third-party rights</li>
          <li>Attempt to interfere with the normal functioning of the Extension</li>
        </ul>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          All rights, title, and interest in and to the Extension, including all intellectual property rights, are owned by [Your Name or Company Name] or its licensors. You may not reproduce, redistribute, or exploit any part of the Extension without permission.
        </p>
      </section>

      <section>
        <h2>7. Termination</h2>
        <p>
          We may suspend or terminate your access to the Extension at any time if we believe you have violated these Terms or engaged in fraudulent, abusive, or harmful behavior. You may stop using the Extension at any time.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer of Warranty</h2>
        <p>
          The Extension is provided "as is" without warranties of any kind. We do not guarantee the Extension will be error-free or uninterrupted. Your use is at your own risk.
        </p>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Extension.
        </p>
      </section>

      <section>
        <h2>10. Modifications to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Extension after changes are posted constitutes your acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2>11. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> your-email@example.com</li>
          <li><strong>Developer:</strong> [Your Name or Company Name]</li>
          <li><strong>Address:</strong> [Optional / Required if legally applicable]</li>
        </ul>
      </section>

      <p>By using this Extension, you agree to comply with these Terms of Service.</p>
    </div>
  );
};

