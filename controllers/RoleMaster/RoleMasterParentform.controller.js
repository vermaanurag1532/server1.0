import connection from '../../db/connection.js';

const RoleMasterParentformControllers = {
    getParentform: (req, res) => {
        const query = 'SELECT * FROM RoleMasterParentform';

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving data:', err.stack);
                res.status(500).send('Database error');
                return;
            }
            res.json(results);
        });
    },

    postParentform: (req, res) => {
        const {
            roleCode,
            roleName,
            roleStatus,
            sessionIdleTimeout,
            allowChangeLoadItemSettingInTrans,
            showStockValueColumnInMfgr,
            showSellValueColumnInMfgr,
            allowReportConfig,
            otpEnabled,
            plannerInd,
            generatePlannerQTO,
            lossNotAllowedCon,
            lockDate,
            allowFormulaRangeApproval,
            canBookLossInOnAccountReturn,
            canPerformDayClose
        } = req.body;

        const query = `
            INSERT INTO RoleMasterParentform (
                RoleCode, RoleName, RoleStatus, SessionIdleTimeout,
                AllowChangeLoadItemSettingInTrans, ShowStockValueColumnInMfgr,
                ShowSellValueColumnInMfgr, AllowReportConfig, OTPEnabled,
                PlannerInd, GeneratePlannerQTO, LossNotAllowedCon, LockDate,
                AllowFormulaRangeApproval, CanBookLossInOnAccountReturn, CanPerformDayClose
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            roleCode,
            roleName,
            roleStatus,
            sessionIdleTimeout,
            allowChangeLoadItemSettingInTrans,
            showStockValueColumnInMfgr,
            showSellValueColumnInMfgr,
            allowReportConfig,
            otpEnabled,
            plannerInd,
            generatePlannerQTO,
            lossNotAllowedCon,
            lockDate || null,
            allowFormulaRangeApproval,
            canBookLossInOnAccountReturn,
            canPerformDayClose
        ];

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Error inserting data:', err.stack);
                res.status(500).send('Database error');
                return;
            }
            res.send('Data added successfully');
        });
    }
};

export default RoleMasterParentformControllers;
