import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy () {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [Insert Date]</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          When you sign up to use our Chrome Extension, we collect the following information:
        </p>
        <ul>
          <li>Email address (provided during signup)</li>
          <li>Extension usage data (e.g. time used, features accessed, plan type)</li>
        </ul>
        <p>
          We do <strong>not</strong> collect browsing history, IP address, cookies, or any other personal information beyond what is necessary to manage your account and usage plan.
        </p>
      </section>

      <section>
        <h2>2. How Your Data Is Used</h2>
        <p>Your data is used strictly for the following purposes:</p>
        <ul>
          <li>To authenticate your account via email</li>
          <li>To enforce access limits and features based on your selected plan (Trial, Basic, Pro)</li>
          <li>To monitor usage for compliance with our terms of service</li>
        </ul>
        <p>
          We do <strong>not</strong> use your data for advertising, profiling, or selling to third parties.
        </p>
      </section>

      <section>
        <h2>3. Data Sharing and Third Parties</h2>
        <p>
          We do <strong>not sell, rent, or share</strong> your personal information with third parties. We may use secure third-party services solely for authentication, data storage, or plan enforcement — all under strict data protection agreements.
        </p>
      </section>

      <section>
        <h2>4. User Rights and Control</h2>
        <p>
          You have full control over your data, including the right to:
        </p>
        <ul>
          <li>Access or update your email and account information</li>
          <li>Request deletion of your account and associated data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the email below.
        </p>
      </section>

      <section>
        <h2>5. Compliance with Laws</h2>
        <p>
          We are committed to compliance with all applicable privacy laws, including:
        </p>
        <ul>
          <li><strong>GDPR</strong> (General Data Protection Regulation – EU/EEA)</li>
          <li><strong>CCPA</strong> (California Consumer Privacy Act – USA)</li>
        </ul>
        <p>
          Your data is stored securely, and we apply best practices to prevent unauthorized access or misuse.
        </p>
      </section>

      <section>
        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. When we do, the updated version will be posted on this page with the revised effective date.
        </p>
      </section>

      <section>
        <h2>7. Contact Information</h2>
        <p>If you have any questions or requests regarding this Privacy Policy, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> your-email@example.com</li>
          <li><strong>Developer:</strong> [Your Name or Company Name]</li>
          <li><strong>Address:</strong> [Optional / Required based on jurisdiction]</li>
        </ul>
      </section>

      <p>By using this Extension, you agree to the terms outlined in this Privacy Policy.</p>
    </div>
  );
};

 
