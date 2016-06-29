import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const About = () => {
  return (
    <Card>
      <CardHeader
        title="Awesome About Box"
        subtitle="by Nestor Alonso"
      />
      <CardMedia
        overlay={<CardTitle title="Tools" subtitle="react, redux, react-router, npm, browserify, babelify, babel, ..." />}
      >
        <img src="assets/img/logo.png" />
      </CardMedia>
      <CardTitle title="About Bootcamp Project" subtitle="Recetas Redux" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
    </Card>
  );
};

export default About;
