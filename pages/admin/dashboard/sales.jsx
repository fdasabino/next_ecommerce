import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import User from "@/models/User";
import styles from "@/styles/pages/AdminSales.module.scss";
import db from "@/utils/db";
import Chart from "chart.js/auto";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminSales = ({ user }) => {
    const router = useRouter();
    const { pathname } = router;
    const path = pathname.split("/admin/dashboard")[1];

    useEffect(() => {
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup function
        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <AdminLayout
            path={path}
            user={user}>
            <div className={styles.admin_sales}>
                <div className={styles.chart}>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSales;
// Server side code remains unchanged

// server side code
export async function getServerSideProps(context) {
    db.connectDB();
    const session = await getSession(context);
    try {
        const user = await User.findOne({ _id: session.user._id }).lean();
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
            },
        };
    } catch (error) {
        return {
            props: {
                error: "Something went wrong",
            },
        };
    } finally {
        db.disconnectDB();
    }
}
