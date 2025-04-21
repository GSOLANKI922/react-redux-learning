import Button from "~/components/Button";
import ComponentRendere from "~/components/ComponentRendere";
import Container from "~/components/Container";
import Book from "~/components/context/Book";
import TheamContextProvider from "~/components/context/TheamContext";
import LogInUser from "~/components/context/userContext/User";
import UserContextProvider from "~/components/context/userContext/UserContext";
import List from "~/components/generic/List";
import Header from "~/components/Header";
import Input from "~/components/Input";
import NameRendrer from "~/components/NameRendrer";
import Text from "~/components/polymorphic/Text";
import Private from "~/components/privaet/Private";
import Profile from "~/components/privaet/Profile";
import InputRef from "~/components/ref/inputRef";
import MutableRef from "~/components/ref/mutableRef";
import RandomNumber from "~/components/restriction/RandomNumber";
import Counter from "~/components/state/Counter";
import Loggedin from "~/components/state/Loggedin";
import User from "~/components/state/User";
import Status from "~/components/Status";
import Tost from "~/components/template-literals/Tost";

export default function Home() {
  return (
    <>
      <Container
        styles={{ backgroundColor: "white", border: "1px solid black" }}
      />
      <Input
        value=""
        handalChage={(event) => console.log(event.target.value)}
      />
      <Button handalClick={(event) => console.log("clicked", event)}>
        Click Me
      </Button>
      <Header>Hello Header</Header>
      <Status status="error" />
      <NameRendrer name="GS" fullName={{ first: "Gautam", last: "Solanki" }} />
      <Loggedin />
      <User />
      <Counter />
      <TheamContextProvider>
        <Book />
      </TheamContextProvider>
      <UserContextProvider>
        <LogInUser />
      </UserContextProvider>
      <InputRef />
      <MutableRef />
      <Private isLogdin={true} component={Profile} />
      <ComponentRendere>
        <ComponentRendere>
          <List
            data={[{ id: 12, label: "gs", value: "gs" }]}
            getUniqueKey={(item) => item.id}
            renderItem={(item) => <div>{item.label}</div>}
          />
        </ComponentRendere>
        <ComponentRendere>
          <List
            data={[1, 3, 5, 7, 8]}
            getUniqueKey={(item) => item}
            renderItem={(item) => <div>{item}</div>}
          />
        </ComponentRendere>
        <ComponentRendere>
          <List
            data={["1jj", 5, "5hj", "7hj", "8gh"]}
            getUniqueKey={(item) => item}
            renderItem={(item) => <div>{item}</div>}
          />
        </ComponentRendere>
      </ComponentRendere>
      <RandomNumber number={10} isPositive />
      <Tost position="center" />
      <ComponentRendere>
        <Text as="h1" version="primery" size="large">
          Hello
        </Text>
        <Text as="p" version="primery" size="large">
          Hello
        </Text>
        <Text as="label" htmlFor="name" version="primery" size="large">
          Hello
        </Text>
        <Text as="webview" version="primery" size="large">
          Hello
        </Text>
      </ComponentRendere>
    </>
  );
}
