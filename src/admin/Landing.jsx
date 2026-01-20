import Home from "./Home";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";

export default function Landing() {
  return (
    <main>
      <section id="home">
        <Home />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="resume">
        <Resume />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
