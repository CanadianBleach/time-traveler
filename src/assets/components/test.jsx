function Test(props) {
    return (
      <>
        <section className="hero is-fullheight">
        <div className="is-flex">
          <div className="block m-1"></div>
          <a className="m-3 has-text-dark" href=""> Blank </a>
          <a
            className="m-3 has-text-dark"
            href="https://github.com/CanadianBleach/"
            target="#blank"
          >
            Github
          </a>
        </div>
        <div
          className="hero-body has-text-centered is-flex-direction-column is-justify-content-space-evenly mb-5"
        >
          <div className="m-6">
            <h2 className="title is-3 has-text-dark">Bonk Bonk Donk Donk.</h2>
            <button className="button is-success is-inverted is-medium" id="login-button"> props.text </button>
          </div>
        </div>
      </section>
      </>
    );
  }
  
  export default Test;