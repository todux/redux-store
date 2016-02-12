import Firebase from 'firebase'

export default function(subdomain) {
  if (subdomain) return new Firebase(`https://${subdomain}.firebaseio.com/todos`)
  else return false
}
