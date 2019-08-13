import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  <Dimmer active inverted>
    <Loader style = {{ marginTop:'25vh'}} inverted size="huge" content={"Loading..."} />
  </Dimmer>
);

export default Spinner;
