#### Goal
Goal of the tool is to browse and analyze build statistics. Currently it is mainly focused on build times.

#### Prerequisites
* Java 11
* Node 12.x.x

##### Configuration
Rename `application-template.properties` to `application.properties`.

Modify following properties in `application.properties`:
`gitlab.ribbon.listOfServers`, `gitlab.private.token` to contain gitlab url and private api token accordingly.
To generate private token please follow the [instruction](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) and select api as a scope.

##### Run
1. Run `GitlabstatsfetcherApplication` class.
2. Run `npm start` in `./frontend` directory.
3. Navigate to `http://localhost:3000/`
