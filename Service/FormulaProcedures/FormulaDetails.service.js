import FormulaDetailsRepository from "../../Repository/FormulaProcedures/FormulaDetails.repository.js";

class FormulaDetailsService {
  /**
   * Get all formula details
   * @returns {Promise<Array>} All formula details
   */
  async getAllFormulaDetails() {
    try {
      return await FormulaDetailsRepository.getAll();
    } catch (error) {
      throw new Error(`Error fetching formula details: ${error.message}`);
    }
  }

  /**
   * Get formula details by formula ID
   * @param {string} formulaId - The formula ID to search for
   * @returns {Promise<Array>} Formula details with the given formula ID
   */
  async getFormulaDetailsByFormulaId(formulaId) {
    try {
      if (!formulaId) {
        throw new Error("Formula ID is required");
      }
      return await FormulaDetailsRepository.getByFormulaId(formulaId);
    } catch (error) {
      throw new Error(`Error fetching formula details by ID: ${error.message}`);
    }
  }

  /**
   * Generate the next formula ID
   * @returns {Promise<string>} The next formula ID
   */
  async generateNextFormulaId() {
    try {
      const latestFormulaId = await FormulaDetailsRepository.getLatestFormulaId();
      // Extract the number part and convert to integer
      const matches = latestFormulaId.match(/Formula-(\d+)/);
      
      if (!matches) {
        return "Formula-1"; // Fallback if no match found
      }
      
      const currentNumber = parseInt(matches[1], 10);
      
      // Check if currentNumber is a valid number
      if (isNaN(currentNumber)) {
        return "Formula-1"; // Fallback if not a valid number
      }
      
      return `Formula-${currentNumber + 1}`;
    } catch (error) {
      throw new Error(`Error generating formula ID: ${error.message}`);
    }
  }

  /**
   * Create formula details from a list of data
   * @param {Array} formulaDetailsList - List of formula details to create
   * @returns {Promise<Object>} Result of the create operation
   */
  async createFormulaDetails(formulaDetailsList) {
    try {
      if (!Array.isArray(formulaDetailsList) || formulaDetailsList.length === 0) {
        throw new Error("Formula details list is required and must be an array");
      }

      // Generate a new formula ID
      const nextFormulaId = await this.generateNextFormulaId();
      
      // Process each formula detail
      const results = [];
      for (const detail of formulaDetailsList) {
        // Assign the same formula ID to all rows in this batch
        const formattedDetail = {
          ...detail,
          formulaId: nextFormulaId
        };
        
        const result = await FormulaDetailsRepository.create(formattedDetail);
        results.push(result);
      }
      
      return {
        formulaId: nextFormulaId,
        results
      };
    } catch (error) {
      throw new Error(`Error creating formula details: ${error.message}`);
    }
  }

  /**
   * Update a formula detail
   * @param {string} formulaId - The formula ID to update
   * @param {string} id - The row ID to update
   * @param {Object} formulaDetail - The updated formula detail
   * @returns {Promise<Object>} Result of the update operation
   */
  async updateFormulaDetail(formulaId, id, formulaDetail) {
    try {
      if (!formulaId || !id) {
        throw new Error("Formula ID and row ID are required");
      }
      return await FormulaDetailsRepository.update(formulaId, id, formulaDetail);
    } catch (error) {
      throw new Error(`Error updating formula detail: ${error.message}`);
    }
  }

  /**
   * Delete formula details by formula ID
   * @param {string} formulaId - The formula ID to delete
   * @returns {Promise<Object>} Result of the delete operation
   */
  async deleteFormulaDetailsByFormulaId(formulaId) {
    try {
      if (!formulaId) {
        throw new Error("Formula ID is required");
      }
      return await FormulaDetailsRepository.deleteByFormulaId(formulaId);
    } catch (error) {
      throw new Error(`Error deleting formula details: ${error.message}`);
    }
  }

  /**
   * Delete a specific formula detail
   * @param {string} formulaId - The formula ID to delete
   * @param {string} id - The row ID to delete
   * @returns {Promise<Object>} Result of the delete operation
   */
  async deleteFormulaDetail(formulaId, id) {
    try {
      if (!formulaId || !id) {
        throw new Error("Formula ID and row ID are required");
      }
      return await FormulaDetailsRepository.deleteFormulaDetail(formulaId, id);
    } catch (error) {
      throw new Error(`Error deleting formula detail: ${error.message}`);
    }
  }
}

export default new FormulaDetailsService();