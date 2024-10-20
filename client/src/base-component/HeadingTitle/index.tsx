import { twMerge } from "tailwind-merge";

interface HeadingTitleProps {
  topDescription?: string;
  bottomDescription?: string;
  className?: string;
  children: React.ReactNode;
}

const HeadingTitle: React.FC<HeadingTitleProps> = (props) => {
  return (
    <header className={twMerge(["relative z-20", props.className])}>
      <p className="mb-2 bg-transparent text-sm font-semibold leading-6 text-lime-green-100 dark:text-lime-green-100">
        {props.topDescription && props.topDescription}
      </p>
      <h1 className="inline-block text-left text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl">
        {props.children}
      </h1>
      <p className="mt-2 block bg-transparent text-lg text-slate-700 antialiased dark:text-slate-400">
        {props.bottomDescription && props.bottomDescription}
      </p>
    </header>
  );
};

export default HeadingTitle;
