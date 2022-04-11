## Hello Visitors
- This is a Address Book managing API.
- Here you have to create a account to store contact details and manage it.
- We have API for all CRUD operations.
- You can use any API testing tool like 'POSTMAN' to check our API functionalities on LocalHosting.
<br/>

### Follow the below steps to interact with API
<br/>

- Run following command to install package dependencies.
```console 
npm install 
```

## 1.) Register - http://localhost:7000/user/register/
- This is a Account registering API, use Phone no. and Password to register.
- Pass your data in JSON format in the body.
- Eg:- {
    "phone" : "0123456789",
    "password" : "****"
}
- You will get a success message and a Token for further use as response.
<br/>

## 2.) Login - http://localhost:7000/user/login/
- This is a Account login API, use Phone no. and Password to authenticate.
- Pass your data in JSON format in the body.
- Eg:- {
    "phone" : "0123456789",
    "password" : "****"
}
- You will get a Token for further use as response.
<br/>

## 3.) Reset Password - http://localhost:7000/user/reset-password/
- This is a Account password resetting API, use Old Password and New Password to change the password.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the Header.
- Pass your data in JSON format in the body.
- Eg:- {
    "oldpass" : "****",
    "newpass" : "******"
}
- You will get a success message as response.
<br/>

## 4.) Delete Account - http://localhost:7000/user/delete/
- This is a Account Deleting API. All Contacts will also get cleared from Database.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the Header.
- You will get a success message as response.
<br/>

## 5.) Add a Contact - http://localhost:7000/contact/add/
- This is a API to Create contact details and store them.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the Header.
- Pass your data in JSON format in the body. The 'number' property is required.
- Eg:- {
    "name" : "abc",
    "number" : 1234567890,
    "email" : "abc@xyz"
}
- You will get a success message as response.
<br/>

## 6.) Add Contact in Bulk - http://localhost:7000/contact/add-many/
- This is a API to Add contact details in bulk and store them.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the Header.
- Pass your data in JSON format in the body. The 'number' property is required.
- Eg:- {"contact":[{
            "name" : "abc",
            "number" : 1234567890,
            "email" : "abc@xyz"
            },{
            "name" : "def",
            "number" : 9876543210,
            "email" : "def@xyz"
            }]
}
- You will get a success message as response.
<br/>

## 7.) Fetch a Contact Detail - http://localhost:7000/contact/fetch/ID/
- This is a API to Fetch a contact details using its Id.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the Header.
- Pass id of contact in the params in place of 'ID'.
- You will get contact in detail as response.
<br/>

## 8.) Fetch phase matching Contact Detail - http://localhost:7000/contact/search?q=abc/
- This is a API to Fetch phase matching contact details using its query params.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the 
Header.
- Pass phase to search in the query params equating 'q'.
- You will get contact in detail as response.
<br/>

## 9.) Fetch all Contact Detail with Pagination - http://localhost:7000/contact/fetch-all?page=x&limit=y/
- This is a API to Fetch all contact details in pagination.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the 
Header.
- Pass page_no. and limit in the query params.
- You will get contact in detail as response.
<br/>

## 10.) Update Contact Details- http://localhost:7000/contact/update/ID
- This is a API to Update contact details using ID.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the 
Header.
- Pass id of contact in the params in place of 'ID'.
- You will get success message as response.
<br/>

## 10.) Delete Contact - http://localhost:7000/contact/delete/ID
- This is a API to Delete contact using ID.
- Pass 'application/json' as 'Content-Type' and Token as 'Authentication' in the 
Header.
- Pass id of contact in the params in place of 'ID'.
- You will get success message as response.
<br/>
