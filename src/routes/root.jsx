import React from 'react';
import { NavLink, Outlet ,useLoaderData,Form,redirect,useNavigation} from 'react-router-dom';
import { getContacts , createContact } from "../contacts";


export default function Root() {
  
    const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
        <div id="sidebar">
            <h1>React router contact</h1>
            <div>
                <Form id="search-form" role="search">
                    <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Search"
                    type="search"
                    name="q"
                    defaultValue={q}
                    />
                    <div
                    id="search-spinner"
                    aria-hidden
                    hidden={true}
                    />
                    <div
                    className="sr-only"
                    aria-live="polite"
                    ></div>
                </Form>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>
                {/* <form method="post">
                    <button type="submit">New</button>
                </form> */}
            </div>
            <nav>
            {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                    >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
              
            </p>
          )}
            {/* <ul>
                <li>
                <Link to={`/contacts/1`} >Your Name</Link>
                {/* <a href={`/contacts/1`}>Your Name</a> 
                </li>
                <li>
                <Link to={`/contacts/2`}>Your Friend</Link>
                {/* <a href={`/contacts/2`}>Your Friend</a> 
                </li>
            </ul> */}
            </nav>

        </div>
        <div id="detail"
            className={
                navigation.state === "loading" ? "loading" : ""
                }
        >
            <Outlet />
        </div>
    </>
  )
}

export async function loader({request}) {
    const url= new URL(request.url);
    const q= url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
  }

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }
  
