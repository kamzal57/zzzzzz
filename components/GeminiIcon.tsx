import React from 'react';

interface GeminiIconProps {
  className?: string;
}

const GeminiIcon: React.FC<GeminiIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.06899 11.211C6.38139 12.8053 7.22891 14.2423 8.44499 15.245C9.66041 16.2484 11.17 16.75 12.75 16.75C14.33 16.75 15.8396 16.2484 17.055 15.245C18.2711 14.2423 19.1186 12.8053 19.431 11.211H12.75V4.5C11.17 4.5 9.66041 5.00159 8.44499 6.00497C7.22891 7.00768 6.38139 8.44473 6.06899 10.039L6.06899 11.211Z"
        fill="url(#paint0_linear_1_2)"
      />
      <path
        d="M12.75 4.5V11.211H19.431C19.1186 8.44405 17.8466 5.92861 15.9398 4.02182C14.033 2.11504 11.5176 0.843018 9 0.843018C7.51331 0.843018 6.0828 1.25534 4.86899 2.015L8.44499 6.005C9.66041 5.00159 11.17 4.5 12.75 4.5Z"
        fill="url(#paint1_linear_1_2)"
      />
      <path
        d="M6.069 11.211L4.869 12.484C4.10869 13.6978 3.69637 15.1283 3.69637 16.615C3.69637 18.1017 4.10869 19.5322 4.869 20.746L8.445 16.755C7.22891 15.7516 6.38139 14.3146 6.069 12.719V11.211Z"
        fill="url(#paint2_linear_1_2)"
      />
      <path
        d="M12.75 16.75H8.445L4.869 20.745C6.0828 21.5053 7.51331 21.9177 9 21.9177C11.5176 21.9177 14.033 20.6456 15.9398 18.7388C17.8466 16.832 19.1186 14.3166 19.431 11.549L19.431 11.21H12.75V16.75Z"
        fill="url(#paint3_linear_1_2)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="12.75"
          y1="4.5"
          x2="12.75"
          y2="16.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A4C2F4" />
          <stop offset="1" stopColor="#4A80F0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_2"
          x1="12.159"
          y1="0.843018"
          x2="12.159"
          y2="11.211"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4C2A4" />
          <stop offset="1" stopColor="#F08F4A" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_2"
          x1="6.069"
          y1="11.211"
          x2="6.069"
          y2="20.746"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C2F4A4" />
          <stop offset="1" stopColor="#80F04A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1_2"
          x1="12.159"
          y1="11.21"
          x2="12.159"
          y2="21.9177"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4A4A4" />
          <stop offset="1" stopColor="#F04A4A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GeminiIcon;
