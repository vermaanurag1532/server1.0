import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from '../db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/employeesImage'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const EmployeeMasterControllers = {
    getEmployeeMaster: (req, res) => {
        const query = 'SELECT * FROM `Employee Master`';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving data:', err.stack);
                res.status(500).send('Database error');
                return;
            }
            res.json(results);
        });
    },

    postEmployeeMaster: [
        upload.single('uploadPhoto'),
        (req, res) => {
            const {
                employeeCode,
                employeeName,
                locationName,
                canChangeGlobalSetting,
                employeeType,
                loginName,
                pfAccountNo,
                esicNo,
                rowStatus,
                remark,
                grade,
                weighterName,
                passwordExpired,
                isLocked,
                noOfFailedAttempts,
                passwordExpiresOn,
                allowAccessFromMainURL,
                emergencyContactName,
                emergencyContact,
                salaryInstr,
                accountName,
                lastLoginDate
            } = req.body;

            const uploadPhoto = req.file ? `/assets/employeesImage/${req.file.filename}` : '';

            const query = `
                INSERT INTO \`Employee Master\` (
                    \`Employee Code\`, \`Employee Name\`, \`Location Name\`, \`Can Change Global Setting\`,
                    \`Upload Photo\`, \`Employee Type\`, \`Login Name\`, \`PF Account No\`, \`ESIC No\`,
                    \`Row Status\`, \`Remark\`, \`Grade\`, \`Weighter Name\`, \`Password Expired\`,
                    \`Is Locked\`, \`No of Failed Attempts\`, \`Password Expires on\`,
                    \`Allow Access From Main URL\`, \`Emergency Contact Name\`, \`Emergency Contact\`,
                    \`Salary Instr\`, \`Account Name\`, \`Last Login Date\`
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                employeeCode || '',
                employeeName || '',
                locationName || '',
                canChangeGlobalSetting || 0,
                uploadPhoto,
                employeeType || '',
                loginName || '',
                pfAccountNo || '',
                esicNo || '',
                rowStatus || '',
                remark || '',
                grade || '',
                weighterName || '',
                passwordExpired || 0,
                isLocked || 0,
                noOfFailedAttempts ? parseInt(noOfFailedAttempts, 10) : null, // Convert to integer or null
                passwordExpiresOn || null,
                allowAccessFromMainURL || 0,
                emergencyContactName || '',
                emergencyContact || '',
                salaryInstr || '',
                accountName || '',
                lastLoginDate || ''
            ];

            connection.query(query, params, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err.stack);
                    res.status(500).json({ error: 'Database error', details: err.message });
                    return;
                }
                res.send('Employee added successfully');
            });
        }
    ]
};

export default EmployeeMasterControllers;
