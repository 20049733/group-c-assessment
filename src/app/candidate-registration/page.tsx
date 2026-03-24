import RegistrationForm from '@/components/RegistrationForm';

export default function CandidateRegistration() {
  return (
    <div style={{ backgroundColor: '#f1f1f1', minHeight: 'calc(100vh - 200px)', padding: '4rem 0' }}>
      <div className="container">
        <RegistrationForm />
      </div>
    </div>
  );
}
