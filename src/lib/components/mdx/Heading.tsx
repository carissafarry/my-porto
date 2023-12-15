const Heading = {
  // eslint-disable-next-line react/prop-types
  H1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold">{children}</h1>
  ),
  // eslint-disable-next-line react/prop-types
  H2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold">{children}</h2>
  ),
};

export default Heading;
