"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GroupTrainingError({ error, reset }: Props) {
  console.error(error);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold text-text">Er liep iets mis</h1>
      <p className="text-text/80 mb-8">
        De pagina kon niet geladen worden. Probeer opnieuw.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700"
      >
        Probeer opnieuw
      </button>
    </main>
  );
}
