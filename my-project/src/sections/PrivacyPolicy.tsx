import React from 'react';
import '../styles/PrivacyPolicy.scss';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>Introduction</h2>
          <p>
          Welcome to iTensor. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application 
          (the "App"). Please read this privacy policy carefully. By using our App, you consent to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Data:</strong> When you register or use our App, we may collect personal information such as your name, email address, and contact details.</li>
            <li><strong>Usage Data:</strong> We automatically collect information about your interaction with the App (such as device type, operating system, and usage statistics).</li>
            <li><strong>Content Data:</strong> Any posts, images, and other content you create through the App are stored on our servers.</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, operate, and maintain the App.</li>
            <li>Improve, personalize, and expand our services.</li>
            <li>Understand and analyze how you use the App.</li>
            <li>Communicate with you (e.g., for support or service updates).</li>
            <li>Enforce our Terms of Service and protect our rights.</li>
          </ul>
        </section>

        <section>
          <h2>Disclosure of Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third parties who assist in operating our App (e.g., hosting providers, analytics services).</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights, we may disclose your information.</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale, or reorganization of our business.</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement a variety of security measures to protect your personal information. 
            However, no security system is completely secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, 
            or to object to certain processing practices. Please contact us at [your email address] for any inquiries regarding your rights.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            Our App may contain links to third-party websites or services that are not operated by us. 
            We are not responsible for the content or practices of these third parties.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make changes, 
            we will update the Effective Date and notify you through the App or via email. 
            We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>By email: claudiuswebdesign@gmail.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 