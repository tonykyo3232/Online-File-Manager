**To run the Spring Boot**

- Run SpRestMongoApplication.java

**To test the router methods**

- Use Postman with these endpoints


**GET Request**

- For Folder
```
http://localhost:8080/folder

http://localhost:8080/folder/all

http://localhost:8080/folder/{id}

http://localhost:8080/folder/{id}/single_folder

http://localhost:8080/folder/{id}/parent
```

- For File
```
http://localhost:8080/file

http://localhost:8080/file/all

http://localhost:8080/file/{id}

http://localhost:8080/file/{id}/parent

```


**POST Request**
- For Folder
```
http://localhost:8080/folder/create
```

- For File
```
http://localhost:8080/file/upload

http://localhost:8080/file/{id}/download
```

**Delete Request**
- For Folder
```
http://localhost:8080/folder/{id}
```

- For File
```
http://localhost:8080/file/{id}
```