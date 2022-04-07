import NavigationBar from "./navbar/NavigationBar.Components";
import Container from "./container/Container.Components";

const Layout = ({ children }) => {
  return (
    <>
      <main>
        <NavigationBar></NavigationBar>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
