# Multiple email input field

This project was done to create a multi email input field. Simply clone this project and get started.  

## Available scripts

To start the project in local machine, simply run:

```bash
yarn dev
```

and then got to http://localhost:1234  
  
  
To build the project:

```bash
yarn build
```

this will create a `dist` folder which will have the code built using `parcel` and ready to ship. Also, it creates two files in `build` which can be used as a separate css & js library, independently in an html file.  

## How to Use
  
To create any div into a multi email input you can create a new `EmailsInput` object by passing the below configuration to the constructor:

```js
{
    inputBox: // The node which will become the multi email input,
    addBtn: // (OPTIONAL) The node (button) on whose click a random email is added,
    countBtn: // (OPTIONAL) The node (button) on whose click an alert with the count of valid emails is shown,
};
```  
  
  
Example usage:

```js
const emailsInput =  new  EmailsInput({
    inputBox: document.querySelector('#emails-input'),
    addBtn: document.querySelector('#btn-add-email'),
    countBtn: document.querySelector('#btn-email-count'),
});
```  
  
  
## Notes

 - The `dist` folder showcases the usage of parcel to bundle the project.
 - The `build` folder showcases the usage of the css and js files in a standalone format without using any framework or web bundler.  

## Links

 - For the app built using `parcel` bundler inside `dist` folder - [link](https://shivindera.github.io/emails-input/dist/)
 - For the app using standalone js and css inside `build` folder - [link](https://shivindera.github.io/emails-input/build/)  
