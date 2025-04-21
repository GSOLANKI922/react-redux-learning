type NameProps = {
  name: string;
  number?: number;
  fullName?: {
    first: string;
    last: string;
  };
};

const NameRendrer = ({ name, number = 10, fullName }: NameProps) => {
  return (
    <div>
      NameRendrer {name} || {number} || {fullName?.first} {fullName?.last}
    </div>
  );
};

export default NameRendrer;
