# Remove Branch After PR-Merge
A github action for removing your branches after they are merged to the other branches in pull requests using js code

## Inputs
### `access_token`
**Required** The github access token that includes the permissions of removing the branches

***Note:*** Make sure to store the access token as github env variable in secrets to keep it secret :)

**Example:**  ```access_token: ${{ secrets.github_access_token }}"```
### `excluded_branches`
**Optional** String of branches name that should never be removed when the're merged

**Example:**  ```excluded_branches: "dev,featureA,featureB"```

***Note:*** The master branch is excluded by default since it should never be removed

## Example of usage
todo