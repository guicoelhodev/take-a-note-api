Auth resolver has two mutation process:

- sendJwtToken:
  try to send a url with current provider oauth method.

- logIn:
  return user data from users table supabase DB.
  But in the process, if user already exist, the mutation only return user selected based
  on id from table.users. If was the first logIn, the mutation create a new insert on DB, after that, returns user from users table, as the first step returns.
