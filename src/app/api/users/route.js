import { query } from "@/lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM users ORDER BY id DESC",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    try {
        const { name, email, type, password } = await request.json();

        // Check if the username (email) already exists
        const existingUser = await query({
            query: "SELECT * FROM users WHERE email = ?",
            values: [email],
        });

        if (existingUser.length > 0) {
            // User already exists, return an error response
            return new Response(JSON.stringify({
                message: "Username already exists",
                status: 500, // You might want to use a more appropriate HTTP status code
            }));
        }

        // User does not exist, proceed with the insertion
        const updateUsers = await query({
            query: "INSERT INTO users (name, email, type, password) VALUES (?, ?, ?, ?)",
            values: [name, email, type, password],
        });

        const result = updateUsers.affectedRows;
        let message = "";

        if (result) {
            message = "success";
        } else {
            message = "error";
        }

        const user = {
            name: name,
            email: email,
            password: password,
        };

        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: request,
        }));
    }
}


export async function PUT(request) {
    try {
        const { id, email, name, type, password } = await request.json();

        // Check if the new email already exists (excluding the current user being updated)
        const existingUser = await query({
            query: "SELECT * FROM users WHERE email = ? AND id != ?",
            values: [email, id],
        });

        if (existingUser.length > 0) {
            // Email already exists for another user, return an error response
            return new Response(JSON.stringify({
                message: "Email already exists for another user",
                status: 400, // You might want to use a more appropriate HTTP status code
            }));
        }

        // Update the user
        const updateProducts = await query({
            query: "UPDATE users SET email = ?, name = ?, type = ?, password = ? WHERE id = ?",
            values: [email, name, type, password, id],
        });

        const result = updateProducts.affectedRows;
        let message = "";

        if (result) {
            message = "success";
        } else {
            message = "error";
        }

        const product = {
            id: id,
            email: email,
            password: password,
        };

        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            
            data: res,
        }));
    }
}


export async function DELETE(request) {

    try {
        const { id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM users WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}