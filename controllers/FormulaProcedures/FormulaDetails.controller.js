import FormulaDetailsService from "../../Service/FormulaProcedures/FormulaDetails.service.js";

class FormulaDetailsController {
  /**
   * Get all formula details
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllFormulaDetails(req, res) {
    try {
      const formulaDetails = await FormulaDetailsService.getAllFormulaDetails();
      res.status(200).json({
        success: true,
        data: formulaDetails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get formula details by formula ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getFormulaDetailsByFormulaId(req, res) {
    try {
      const { formulaId } = req.params;
      const formulaDetails = await FormulaDetailsService.getFormulaDetailsByFormulaId(formulaId);
      
      if (formulaDetails.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No formula details found with ID: ${formulaId}`
        });
      }
      
      res.status(200).json({
        success: true,
        data: formulaDetails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Create formula details
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createFormulaDetails(req, res) {
    try {
      const formulaDetailsList = req.body;
      const result = await FormulaDetailsService.createFormulaDetails(formulaDetailsList);
      
      // Return only the formula ID
      res.status(201).json({
        formulaId: result.formulaId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Update a formula detail
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateFormulaDetail(req, res) {
    try {
      const { formulaId, id } = req.params;
      const formulaDetail = req.body;
      
      const result = await FormulaDetailsService.updateFormulaDetail(formulaId, id, formulaDetail);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `No formula detail found with formulaId: ${formulaId} and id: ${id}`
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Formula detail updated successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Delete formula details by formula ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteFormulaDetailsByFormulaId(req, res) {
    try {
      const { formulaId } = req.params;
      const result = await FormulaDetailsService.deleteFormulaDetailsByFormulaId(formulaId);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `No formula details found with ID: ${formulaId}`
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Formula details deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Delete a specific formula detail
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteFormulaDetail(req, res) {
    try {
      const { formulaId, id } = req.params;
      const result = await FormulaDetailsService.deleteFormulaDetail(formulaId, id);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `No formula detail found with formulaId: ${formulaId} and id: ${id}`
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Formula detail deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new FormulaDetailsController();