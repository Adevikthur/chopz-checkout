import { CheckIcon } from '@heroicons/react/24/solid';

const steps = [
  { id: 1, label: 'Cart' },
  { id: 2, label: 'Delivery' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Confirmation' }
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`step ${currentStep === step.id ? 'active' : ''} ${
            currentStep > step.id ? 'completed' : ''
          }`}
        >
          <div className="step-number">
            {currentStep > step.id ? (
              <CheckIcon className="w-5 h-5 text-white" />
            ) : (
              step.id
            )}
          </div>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper; 