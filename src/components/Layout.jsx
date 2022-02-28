import NavigationBar from "./navbar/NavigationBar.Components";
import Container from "./container/Container.Components";

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
